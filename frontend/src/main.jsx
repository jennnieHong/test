import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import { BrowserRouter } from 'react-router-dom'

function Root(){
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
	useEffect(()=>{
		const onResize = ()=> setIsMobile(window.innerWidth <= 768)
		window.addEventListener('resize', onResize)
		return ()=> window.removeEventListener('resize', onResize)
	},[])

	return (
		<BrowserRouter>
			<App isMobile={isMobile} />
		</BrowserRouter>
	)
}

createRoot(document.getElementById('root')).render(<Root />)
