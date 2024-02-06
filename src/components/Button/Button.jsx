function Button({
    label,
    styles,
    type,
    onClick,
}) {
  return (
    <button className={styles} type={type} onClick={onClick}>{label}</button>
  )
}

export default Button