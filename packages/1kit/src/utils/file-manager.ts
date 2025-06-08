import path from "node:path"
import fs from "fs-extra"
import {
  ModuleKind,
  ModuleResolutionKind,
  Node,
  Project,
  ProjectOptions,
  ScriptTarget,
  SourceFile,
  Statement,
  StringLiteral,
  SyntaxKind,
} from "ts-morph"
import { JsxEmit } from "typescript"

export class TSFileManager {
  private project: Project
  private projectRoot: string

  constructor(projectName: string) {
    this.projectRoot = path.resolve(process.cwd(), projectName)

    const options: ProjectOptions = {
      compilerOptions: {
        target: ScriptTarget.ES2020,
        module: ModuleKind.ESNext,
        moduleResolution: ModuleResolutionKind.NodeJs,
        jsx: JsxEmit.Preserve,
        strict: true,
        skipLibCheck: true,
        esModuleInterop: true,
      },
      skipAddingFilesFromTsConfig: true,
      useInMemoryFileSystem: true,
    }

    this.project = new Project(options)
  }

  /**
   * Ensure directory exists
   * @param filePath Path to the file
   */
  private async ensureDirectoryExists(filePath: string): Promise<void> {
    const dir = path.dirname(filePath)
    await fs.ensureDir(dir)
  }

  /**
   * Get absolute path for a file
   * @param relativePath Path relative to project root
   */
  private getAbsolutePath(relativePath: string): string {
    const normalizedPath = relativePath.replace(/\\/g, "/")
    return path.join(this.projectRoot, normalizedPath)
  }

  /**
   * Check if a file exists
   * @param relativePath Path relative to project root
   */
  async fileExists(relativePath: string): Promise<boolean> {
    const absolutePath = this.getAbsolutePath(relativePath)
    return fs.pathExists(absolutePath)
  }

  /**
   * Get or create a source file
   * @param relativePath Path relative to project root
   * @param defaultContent Content to use if file doesn't exist
   */
  async getOrCreateFile(
    relativePath: string,
    defaultContent: string = ""
  ): Promise<SourceFile> {
    const absolutePath = this.getAbsolutePath(relativePath)
    await this.ensureDirectoryExists(absolutePath)

    let content = defaultContent
    if (await this.fileExists(relativePath)) {
      try {
        content = await fs.readFile(absolutePath, "utf-8")
      } catch (error) {
        console.warn(
          `Warning: Could not read existing file ${absolutePath}, using default content`
        )
      }
    }

    const sourceFile = this.project.createSourceFile(absolutePath, content, {
      overwrite: true,
    })
    await fs.writeFile(absolutePath, content, "utf-8")
    return sourceFile
  }

  /**
   * Add a new TypeScript/TSX file to the project
   * @param relativePath Path relative to project root
   * @param content Initial content of the file
   */
  async createFile(relativePath: string, content: string): Promise<SourceFile> {
    const absolutePath = this.getAbsolutePath(relativePath)
    await this.ensureDirectoryExists(absolutePath)

    const sourceFile = this.project.createSourceFile(absolutePath, content, {
      overwrite: true,
    })
    await fs.writeFile(absolutePath, content, "utf-8")
    return sourceFile
  }

  /**
   * Save a source file to disk
   * @param sourceFile Source file to save
   */
  async saveFile(sourceFile: SourceFile): Promise<void> {
    const filePath = sourceFile.getFilePath()
    const content = sourceFile.getFullText()

    await this.ensureDirectoryExists(filePath)
    await fs.writeFile(filePath, content, "utf-8")
  }

  /**
   * Add imports to a TypeScript/TSX file
   * @param sourceFile Source file to modify
   * @param imports Array of import configurations
   */
  async addImports(
    sourceFile: SourceFile,
    imports: { name: string; path: string; isDefault?: boolean }[]
  ): Promise<void> {
    for (const imp of imports) {
      if (imp.isDefault) {
        sourceFile.addImportDeclaration({
          defaultImport: imp.name,
          moduleSpecifier: imp.path,
        })
      } else {
        sourceFile.addImportDeclaration({
          namedImports: [imp.name],
          moduleSpecifier: imp.path,
        })
      }
    }
    await this.saveFile(sourceFile)
  }

  /**
   * Add a code block to a TypeScript/TSX file
   * @param sourceFile Source file to modify
   * @param code Code block to add
   * @param position Position to insert the code (end by default)
   */
  async addCodeBlock(
    sourceFile: SourceFile,
    code: string,
    position: "start" | "end" = "end"
  ): Promise<void> {
    const statements = this.project
      .createSourceFile("temp.ts", code)
      .getStatements()
    if (position === "start") {
      sourceFile.insertStatements(
        0,
        statements.map((s: Statement) => s.getText())
      )
    } else {
      sourceFile.addStatements(statements.map((s: Statement) => s.getText()))
    }
    await this.saveFile(sourceFile)
  }

  /**
   * Modify existing code in a TypeScript/TSX file
   * @param sourceFile Source file to modify
   * @param searchPattern Pattern to search for
   * @param replacement Replacement code
   */
  async modifyCode(
    sourceFile: SourceFile,
    searchPattern: string,
    replacement: string
  ): Promise<void> {
    const nodes = sourceFile
      .getDescendantsOfKind(SyntaxKind.StringLiteral)
      .filter((node: StringLiteral) => node.getText().includes(searchPattern))

    nodes.forEach((node: StringLiteral) => {
      node.replaceWithText(replacement)
    })

    await this.saveFile(sourceFile)
  }

  /**
   * Format the TypeScript/TSX file
   * @param sourceFile Source file to format
   */
  async formatFile(sourceFile: SourceFile): Promise<void> {
    sourceFile.formatText()
    await this.saveFile(sourceFile)
  }
}
