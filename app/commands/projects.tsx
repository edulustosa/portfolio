import { BiLogoDocker, BiLogoTypescript } from 'react-icons/bi'
import { DiRedis } from 'react-icons/di'
import { FaAws, FaGithubAlt, FaNodeJs } from 'react-icons/fa'
import { FaGolang } from 'react-icons/fa6'
import { IoLogoJavascript } from 'react-icons/io5'
import { SiApachekafka, SiMongodb, SiPostgresql } from 'react-icons/si'

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
    {
      title: 'Anotaaí Backend Challenge',
      href: 'https://github.com/edulustosa/anotaai-desafio-backend',
      description: t.anotaiBackEndChallenge,
      techs: [
        <BiLogoTypescript key={0} size={35} />,
        <FaNodeJs key={1} size={28} />,
        <SiMongodb key={2} size={28} />,
        <FaAws key={3} size={28} />,
      ],
    },
    {
      title: 'Imago',
      href: 'https://github.com/edulustosa/imago',
      description: t.imago,
      techs: [
        <FaGolang key={0} size={38} />,
        <SiPostgresql key={1} size={28} />,
        <DiRedis key={2} size={35} />,
        <SiApachekafka key={3} size={28} />,
        <BiLogoDocker key={4} size={35} />,
        <FaAws key={5} size={28} />,
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
