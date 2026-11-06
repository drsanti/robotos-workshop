import { Link } from 'react-router-dom'
import { usePrefs } from '../context/PrefsContext'
import { AppearanceMenu } from './AppearanceMenu'
import { SegmentedControl } from './SegmentedControl'
import type { Lang, Theme } from '../lib/storage'

export function TopBar({
  brandQuiet,
  homeTo = '/',
}: {
  brandQuiet: string
  homeTo?: string
}) {
  const { theme, lang, setTheme, setLang, ui } = usePrefs()

  return (
    <div className="relative z-30 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[46rem] items-center justify-between gap-3 px-5 py-3">
        <Link to={homeTo} className="no-underline">
          <p className="m-0 text-[0.95rem] font-semibold text-[var(--ink)]">
            <span className="text-[var(--accent)]">r/</span> robotos{' '}
            <span className="font-normal text-[var(--muted)]">{brandQuiet}</span>
          </p>
        </Link>
        <div className="flex items-center gap-2">
          <SegmentedControl<Theme>
            aria-label={ui.theme}
            size="sm"
            value={theme}
            onChange={setTheme}
            options={[
              {
                value: 'light',
                label: ui.themeLight,
                title: `${ui.theme}: ${ui.themeLight} · ${ui.themeSwitch}`,
              },
              {
                value: 'dark',
                label: ui.themeDark,
                title: `${ui.theme}: ${ui.themeDark} · ${ui.themeSwitch}`,
              },
            ]}
          />
          <SegmentedControl<Lang>
            aria-label={ui.language}
            size="sm"
            value={lang}
            onChange={setLang}
            options={[
              {
                value: 'en',
                label: 'EN',
                title: `${ui.language}: EN · ${ui.languageSwitch}`,
              },
              {
                value: 'th',
                label: 'TH',
                title: `${ui.language}: TH · ${ui.languageSwitch}`,
              },
            ]}
          />
          <AppearanceMenu />
        </div>
      </div>
    </div>
  )
}
