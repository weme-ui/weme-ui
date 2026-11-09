function copyButtons() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy-command]').forEach((button) => {
    button.addEventListener('click', async () => {
      const text = button.dataset.copyCommand
      if (!text) return
      const idle = button.dataset.labelIdle || '复制'
      const done = button.dataset.labelDone || '已复制'
      try {
        await navigator.clipboard.writeText(text)
        button.textContent = done
        window.setTimeout(() => {
          button.textContent = idle
        }, 1600)
      } catch {
        button.textContent = '复制失败'
        window.setTimeout(() => {
          button.textContent = idle
        }, 1600)
      }
    })
  })
}

copyButtons()
