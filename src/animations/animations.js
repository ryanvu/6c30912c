export const callDetailVariants = {
  parent: {
    initial: {
      x: -20,
    },
    animate: {
      x: 0,
    },
    hover: {
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  },
  icon: {
    initial: {
      width: 0,
      opacity: 0,
    },
    hover: {
      width: 'auto',
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  }
}