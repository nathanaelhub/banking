const Category = ({ category }: CategoryProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-[12.5px]">
        <span className="flex items-center gap-2">
          <span
            className="w-[22px] h-[22px] rounded-[7px] bg-[#F4EEFF] text-[#5B21B6] inline-flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
          >
            {category.name[0]}
          </span>
          <b className="font-medium text-[#14111C]">{category.name}</b>
        </span>
        <span
          className="text-[#6B6577] text-[11.5px]"
          style={{ fontFamily: 'var(--font-geist-mono, monospace)' }}
        >
          {category.count}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[#F4F3EE] overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${(category.count / category.totalCount) * 100}%`,
            background: 'linear-gradient(90deg, #A78BFA, #6D28D9)',
          }}
        />
      </div>
    </div>
  )
}

export default Category
