import toast from 'svelte-french-toast'

export const showSuccessToast = (message: string, duration: number = 2000) => {
	toast.success(message, {
		duration: duration,
        position: 'bottom-center',
	})
}

export const showErrorToast = (message: string, duration: number = 2000) => {
	toast.error(message, {
		duration: duration,
        position: 'bottom-center',
	})
}

export const showHoneypotErrorToast = () => {
	toast.error('No Bots Allowed', {
		duration: 1500,
		position: 'bottom-center',
        icon: '🤖',
	})
}