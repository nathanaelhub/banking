const HeaderBox = ({ type = "title", title, subtext, user }: HeaderBoxProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#14111C]">
        {title}
        {type === 'greeting' && (
          <span className="text-[#7C3AED]"> {user}</span>
        )}
      </h1>
      <p className="text-[13.5px] text-[#6B6577]">{subtext}</p>
    </div>
  )
}

export default HeaderBox
