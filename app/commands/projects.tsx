import { BiLogoDocker } from 'react-icons/bi'
import { DiRedis } from 'react-icons/di'
import { FaGithubAlt } from 'react-icons/fa'
import { FaGolang } from 'react-icons/fa6'
import { IoLogoJavascript } from 'react-icons/io5'
import { SiPostgresql } from 'react-icons/si'

interface Project {
  title: string
  href: string
  description: string
  techs: JSX.Element[]
}

const projects: Project[] = [
  {
    title: 'Hydro Helper',
    href: 'https://github.com/edulustosa/hydro-helper',
    description: `
      A Chrome extension designed to help users manage their daily water intake. 
      It allows users to log their water consumption and monitors progress toward a daily hydration goal.
      The extension also sends reminder notifications every 90 minutes to prompt water intake, ceasing once the daily goal is achieved.
      `,
    techs: [<IoLogoJavascript key={0} size={29} />],
  },
  {
    title: 'Caching Proxy',
    href: 'https://github.com/edulustosa/caching-proxy',
    description: `
    A CLI tool that starts a caching proxy server. 
      It forwards requests to the actual server and caches the responses. 
      If the same request is made again, it returns the cached response instead of forwarding the request to the server.
    `,
    techs: [
      <FaGolang key={0} size={38} />,
      <DiRedis key={1} size={35} />,
      <BiLogoDocker key={3} size={35} />,
    ],
  },
  {
    title: 'Go Pay',
    href: 'https://github.com/edulustosa/go-pay',
    description: `This project is an implementation in Go of PicPay's back-end
         challenge, which proposes the creation of a simplified version of
         PicPay, where users can make deposits and money transfers. The system
         supports two types of users: regular users and merchants, both with
         their respective wallets for financial transactions between them.`,
    techs: [
      <FaGolang key={0} size={38} />,
      <SiPostgresql key={1} size={28} />,
      <BiLogoDocker key={3} size={35} />,
    ],
  },
]

export default function Projects() {
  return (
    <ul className="flex flex-col gap-4">
      {projects.map((project) => (
        <li key={project.title}>
          <div className="mb-3 flex items-center gap-7">
            <a
              href={project.href}
              className="flex items-center gap-2 underline decoration-main-font-color underline-offset-2 hover:decoration-secondary-font-color"
              target="_blank"
            >
              <h2 className="text-secondary-font-color">{project.title}</h2>
              <FaGithubAlt size={25} className="text-gray-300" />
            </a>

            <div className="flex items-center gap-3">{project.techs}</div>
          </div>

          <p>{project.description}</p>
        </li>
      ))}
    </ul>
  )
}
