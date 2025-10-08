import OneKitCopyButton from './1kit-copy-button';

export default function HeroContent() {
  return (
    <div className="relative text-center overflow-hidden min-h-screen">
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="max-w-7xl m-auto px-4 relative z-10 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl md:text-6xl leading-[1.1] font-bold tracking-[-0.03em] max-w-[900px] mx-auto text-black bg-[#F9F9F9]">
          Launch Production-Ready
          <br />
          Project in Days, Not Months
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-[600px] mx-auto leading-relaxed bg-[#F9F9F9]">
          1kit provides select-and-setup CLI to accelerate your development.
          Save time, money & hassle with the open-source toolkit.
        </p>

        <OneKitCopyButton />
      </div>
    </div>
  )
}
