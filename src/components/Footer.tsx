import { Github } from 'lucide-react';

function Footer() {
  return (
    <footer className="flex flex-col font-Jersey10 justify-center items-center mt-auto gap-8 p-10 bg-neutral-700 text-gray-200">
    <nav className="grid grid-flow-col gap-4">
      <a className="link link-hover" target='blank' href='https://portfolio.khilar.me/'>About me</a>
      <a className="link link-hover" href='mailto:subhranshukhilar@outlook.com'>Contact</a>
      <a className="link link-hover" href='mailto:subhranshukhilar@outlook.com'>Hire me</a>
    </nav> 
    <nav>
      <div className="grid grid-flow-col gap-4">
        <a href='https://github.com/Susekh'><Github /></a>
      </div>
    </nav> 
    <aside className='text-center'>
      <p>Copyright © 2024 - All right reserved by SUSEKH</p>
    </aside>
    </footer>
  )
}

export default Footer