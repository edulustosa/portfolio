import { BiLogoDocker } from 'react-icons/bi'
import { DiRedis } from 'react-icons/di'
import { FaGithubAlt } from 'react-icons/fa'
import { FaGolang } from 'react-icons/fa6'
import { IoLogoJavascript } from 'react-icons/io5'
import { SiPostgresql } from 'react-icons/si'
import useTranslation from '../hooks/translation'

interface Project {
  title: string
  href: string
  description: string
  techs: JSX.Element[]
}

export default function Projects() {
  const t = useTranslation()

  const projects: Project[] = [
    {
      title: 'Hydro Helper',
      href: 'https://github.com/edulustosa/hydro-helper',
      description: t.hydroHelper,
      techs: [<IoLogoJavascript key={0} size={29} />],
    },
    {
      title: 'Caching Proxy',
      href: 'https://github.com/edulustosa/caching-proxy',
      description: t.cachingProxy,
      techs: [
        <FaGolang key={0} size={38} />,
        <DiRedis key={1} size={35} />,
        <BiLogoDocker key={3} size={35} />,
      ],
    },
    {
      title: 'Go Pay',
      href: 'https://github.com/edulustosa/go-pay',
      description: t.goPay,
      techs: [
        <FaGolang key={0} size={38} />,
        <SiPostgresql key={1} size={28} />,
        <BiLogoDocker key={3} size={35} />,
      ],
    },
  ]

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
