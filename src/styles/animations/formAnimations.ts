
export const promptAnimate = {
  hidden: {
    opacity: 0,
    x: -100
  },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: custom * 0.2 }
  })
}