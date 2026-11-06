import { Navigate, Route, Routes } from 'react-router-dom'
import { LiveGraphPanel } from './components/LiveGraphPanel'
import { TerminalDock } from './components/TerminalDock'
import { HostProvider } from './context/HostContext'
import { PrefsProvider } from './context/PrefsContext'
import { HubPage } from './pages/HubPage'
import { Hw00Page } from './pages/Hw00Page'
import { Hw01Page } from './pages/Hw01Page'
import { Hw02Page } from './pages/Hw02Page'
import { Hw03Page } from './pages/Hw03Page'
import { Hw04Page } from './pages/Hw04Page'
import { Hw05Page } from './pages/Hw05Page'
import { Hw06Page } from './pages/Hw06Page'
import { Hw07Page } from './pages/Hw07Page'
import { LabTemplatePage } from './pages/LabTemplatePage'
import { Mw00Page } from './pages/Mw00Page'
import { Mw01Page } from './pages/Mw01Page'
import { Mw02Page } from './pages/Mw02Page'
import { Mw03Page } from './pages/Mw03Page'
import { Mw04Page } from './pages/Mw04Page'
import { Mw05Page } from './pages/Mw05Page'
import { Mw06Page } from './pages/Mw06Page'
import { SetupPage } from './pages/SetupPage'
import { TrackPage } from './pages/TrackPage'
import { Wh00Page } from './pages/Wh00Page'
import { Wh01Page } from './pages/Wh01Page'
import { Wh02Page } from './pages/Wh02Page'
import { Wh03Page } from './pages/Wh03Page'
import { Wh04Page } from './pages/Wh04Page'
import { Wh05Page } from './pages/Wh05Page'
import { Wh06Page } from './pages/Wh06Page'
import { Wh07Page } from './pages/Wh07Page'
import { Wh08Page } from './pages/Wh08Page'

export default function App() {
  return (
    <PrefsProvider>
      <HostProvider>
        <Routes>
          <Route path="/" element={<HubPage />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/labs/mw-00" element={<Mw00Page />} />
          <Route path="/labs/mw-01" element={<Mw01Page />} />
          <Route path="/labs/mw-02" element={<Mw02Page />} />
          <Route path="/labs/mw-03" element={<Mw03Page />} />
          <Route path="/labs/mw-04" element={<Mw04Page />} />
          <Route path="/labs/mw-05" element={<Mw05Page />} />
          <Route path="/labs/mw-06" element={<Mw06Page />} />
          <Route path="/labs/wh-00" element={<Wh00Page />} />
          <Route path="/labs/wh-01" element={<Wh01Page />} />
          <Route path="/labs/wh-02" element={<Wh02Page />} />
          <Route path="/labs/wh-03" element={<Wh03Page />} />
          <Route path="/labs/wh-04" element={<Wh04Page />} />
          <Route path="/labs/wh-05" element={<Wh05Page />} />
          <Route path="/labs/wh-06" element={<Wh06Page />} />
          <Route path="/labs/wh-07" element={<Wh07Page />} />
          <Route path="/labs/wh-08" element={<Wh08Page />} />
          <Route path="/labs/hw-00" element={<Hw00Page />} />
          <Route path="/labs/hw-01" element={<Hw01Page />} />
          <Route path="/labs/hw-02" element={<Hw02Page />} />
          <Route path="/labs/hw-03" element={<Hw03Page />} />
          <Route path="/labs/hw-04" element={<Hw04Page />} />
          <Route path="/labs/hw-05" element={<Hw05Page />} />
          <Route path="/labs/hw-06" element={<Hw06Page />} />
          <Route path="/labs/hw-07" element={<Hw07Page />} />
          <Route path="/labs/template" element={<LabTemplatePage />} />
          <Route path="/labs/:track" element={<TrackPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <LiveGraphPanel />
        <TerminalDock />
      </HostProvider>
    </PrefsProvider>
  )
}
