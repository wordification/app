const ProgressBar = ({
  value,
  max,
}: {
  value: number | undefined
  max: number | undefined
}) => {
  return (
    <div className="pb-2">
      <progress className="progress progress-primary" value={value} max={max} />
    </div>
  )
}

export default ProgressBar
