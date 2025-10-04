#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
  .name('1kit')
  .description('1kit CLI - A toolkit for modern web development')
  .version('0.0.1');

program
  .command('hello')
  .description('Display a hello message')
  .action(() => {
    console.log(chalk.blue('👋 Hello from 1kit CLI!'));
  });

program.parse();
