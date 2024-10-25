import Donut from 'react-spinning-donut'
import { FaCode, FaGithub, FaLinkedin } from 'react-icons/fa'
import { AiFillCode } from 'react-icons/ai'
import { IoIosGitNetwork, IoMdPerson } from 'react-icons/io'
import { MdAlternateEmail, MdEmail } from 'react-icons/md'
import useTranslation from '../hooks/translation'

export default function Sumfetch() {
  const t = useTranslation()

  return (
    <div className="ml-8 flex items-center gap-24">
      <Donut color="#E1E1DF" fontSize={6} scaleX={1} scaleY={0.75} />

      <div className="divide-y divide-dashed divide-main-font-color">
        <div className="my-2 flex items-center gap-2">
          <FaCode />
          <h2>sumfetch</h2>
        </div>

        <div className="flex flex-col gap-1">
          <span className="mt-2 inline-flex items-center gap-2">
            <AiFillCode />
            <span>{t.sumfetch.about}</span>
          </span>

          <span className="inline-flex items-center gap-2">
            <IoMdPerson />
            <span>Eduardo Lustosa</span>
          </span>

          <a
            href="https://github.com/edulustosa/portifolio"
            target="_blank"
            className="mb-2 inline-flex items-center gap-2 underline decoration-main-font-color underline-offset-2 hover:decoration-secondary-font-color"
          >
            <IoIosGitNetwork />
            <span>Github repo</span>
          </a>
        </div>

        <div className="flex flex-col gap-1">
          <span className="mt-2 inline-flex items-center gap-2">
            <MdAlternateEmail />
            <span>{t.sumfetch.contact}</span>
          </span>

          <a
            href="mailto:eduardolustosa26@gmail.com"
            target="_blank"
            className="inline-flex items-center gap-2 underline decoration-main-font-color underline-offset-2 hover:decoration-secondary-font-color"
          >
            <MdEmail />
            <span>eduardolustosa26@gmail.com</span>
          </a>

          <a
            href="https://github.com/edulustosa"
            target="_blank"
            className="inline-flex items-center gap-2 underline decoration-main-font-color underline-offset-2 hover:decoration-secondary-font-color"
          >
            <FaGithub />
            <span>github.com/edulustosa</span>
          </a>

          <a
            href="https://www.linkedin.com/in/eduardolustosa/"
            target="_blank"
            className="inline-flex items-center gap-2 underline decoration-main-font-color underline-offset-2 hover:decoration-secondary-font-color"
          >
            <FaLinkedin />
            <span>linkedin.com/in/eduardolustosa</span>
          </a>
        </div>
      </div>
    </div>
  )
}
