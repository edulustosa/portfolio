import { BiLogoDocker, BiLogoTypescript } from 'react-icons/bi'
import { DiRedis } from 'react-icons/di'
import { FaNodeJs, FaReact } from 'react-icons/fa'
import { FaGolang } from 'react-icons/fa6'
import { IoLogoJavascript } from 'react-icons/io5'
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'
import { SiMongodb, SiPostgresql } from 'react-icons/si'

const logos = [
  {
    name: 'TypeScript',
    icon: <BiLogoTypescript size={35} />,
  },
  {
    name: 'JavaScript',
    icon: <IoLogoJavascript size={29} />,
  },
  {
    name: 'NodeJS',
    icon: <FaNodeJs size={28} />,
  },
  {
    name: 'Golang',
    icon: <FaGolang size={38} />,
  },
  {
    name: 'PostgreSQL',
    icon: <SiPostgresql size={28} />,
  },
  {
    name: 'MongoDB',
    icon: <SiMongodb size={28} />,
  },
  {
    name: 'Redis',
    icon: <DiRedis size={35} />,
  },
  {
    name: 'Docker',
    icon: <BiLogoDocker size={35} />,
  },
  {
    name: 'React',
    icon: <FaReact size={28} />,
  },
  {
    name: 'NextJS',
    icon: <RiNextjsFill size={30} />,
  },
  {
    name: 'TailwindCSS',
    icon: <RiTailwindCssFill size={30} />,
  },
]

export default function About() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-secondary-font-color">Eduardo Lustosa de Souza</h2>

      <span>Back-end Developer | NodeJS | TypeScript | Go</span>

      <p>
        I am a software developer with a focus on back-end development. I have
        experience with Go, NodeJS, and TypeScript. Also have experience in
        front-end development with React and NextJS. I am passionate about
        technology and software development. I am always looking for new
        challenges and opportunities to learn new things.
      </p>

      <h3>Skills</h3>

      <ul className="flex gap-3">
        {logos.map((logo) => (
          <li className="flex items-center justify-center" key={logo.name}>
            <abbr title={logo.name}>{logo.icon}</abbr>
          </li>
        ))}
      </ul>
    </div>
  )
}
