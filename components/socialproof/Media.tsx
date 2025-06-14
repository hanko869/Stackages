export default function Media({ seen = true }) {
  return (
    <div className="flex items-center justify-center gap-3 lg:justify-start">
      <div className="flex items-center space-x-10">
        {seen && (
          <span className="text-sm text-neutral hidden md:flex">
            As seen on
          </span>
        )}
        <img
          src="/seen/1.png"
          alt="Seen on"
          className="w-[40px] md:w-[70px] grayscale"
        />
        <img
          src="/seen/2.png"
          alt="Seen on"
          className="w-[40px] md:w-[100px] grayscale"
        />
        <img
          src="/seen/3.png"
          alt="Seen on"
          className="w-1/5 md:w-[100px] grayscale"
        />
        <img
          src="/seen/4.png"
          alt="Seen on"
          className="w-1/5 md:w-[100px] grayscale"
        />
        <div className="px-1"></div>
        <img
          src="/seen/5.png"
          alt="Seen on"
          className="w-1/5 md:w-[80px] grayscale"
        />
      </div>
    </div>
  );
}
