import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import { BrowserRouter } from 'react-router-dom'

import { LanguageProvider } from './i18n/LanguageContext'
import { ThemeProvider } from './theme/ThemeContext'

function Root(){
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
	useEffect(()=>{
		const onResize = ()=> setIsMobile(window.innerWidth <= 768)
		window.addEventListener('resize', onResize)
		return ()=> window.removeEventListener('resize', onResize)
	},[])

	return (
		<ThemeProvider>
			<LanguageProvider>
				<BrowserRouter>
					<App isMobile={isMobile} />
				</BrowserRouter>
			</LanguageProvider>
		</ThemeProvider>
	)
}

createRoot(document.getElementById('root')).render(<Root />)
