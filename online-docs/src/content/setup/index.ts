import { linuxTrack } from './linux'
import { macosTrack } from './macos'
import { windowsTrack } from './windows'
import type { OsTrack } from './types'

export const OS_TRACKS: OsTrack[] = [windowsTrack, macosTrack, linuxTrack]

export function trackByOs(os: OsTrack['key']) {
  return OS_TRACKS.find((t) => t.key === os) ?? windowsTrack
}
