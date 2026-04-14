/**
 * Toast Utility
 */

export const showToast = (message, type = 'success', duration = 3000) => {
  let container = document.getElementById('toast-container')
  if (!container) {
    container = document.createElement('div')
    container.id = 'toast-container'
    container.className = 'position-fixed bottom-0 end-0 p-3'
    container.style.zIndex = '2000'
    document.body.appendChild(container)
  }

  const toast = document.createElement('div')
  toast.className = `toast-item glass-toast fade-in-up ${type}`
  
  const icon = type === 'success' 
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#10b981" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ef4444" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>`
  
  toast.innerHTML = `
    <div class="toast-content d-flex align-items-center gap-3">
      <div class="toast-icon-wrapper d-flex align-items-center">${icon}</div>
      <span class="toast-text">${message}</span>
    </div>
  `

  container.appendChild(toast)

  setTimeout(() => {
    toast.classList.add('fade-out')
    setTimeout(() => {
      toast.remove()
      if (container.childNodes.length === 0) {
        container.remove()
      }
    }, 400)
  }, duration)
}
