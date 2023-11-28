import AppRouter from './router/AppRouter'
import AppTheme from './theme/AppTheme'

export default function App (): JSX.Element {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  )
}
