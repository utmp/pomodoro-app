import { ElectronAPI } from '@electron-toolkit/preload'
export interface IElectronAPI {
  sendNotification: (title: string, body: string) => void
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
  }
}
