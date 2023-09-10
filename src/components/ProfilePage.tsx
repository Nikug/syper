import { Component, Show, createSignal } from 'solid-js'
import { getUserName, isSignedIn, signIn, signOut, signUp } from '../authentication/Supabase'
import { Button } from './Button'
import { Header } from './Header'
import { HistoricalStatisticsContainer } from './HistoricalStatisticsContainer'
import { Input } from './Input'

const ProfilePage: Component = () => {
  const [email, setEmail] = createSignal<string>('')
  const [password, setPassword] = createSignal<string>('')

  return (
    <div class="max-w-7xl px-16 mx-auto">
      <Header />
      <div class="mt-16">
        <Show when={!isSignedIn()}>
          <h3 class="text-xl font-bold mb-8">Sign in to save your results</h3>
          <div class="pb-4">
            <div class="mb-2">
              <label for="email" class="block">
                Email
              </label>
              <Input
                id="email"
                value={email()}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label for="password" class="block">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password()}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
          <div class="flex gap-4">
            <Button onClick={() => signIn(email(), password())} text="Sign in" />
            <Button onClick={() => signUp(email(), password())} text="Sign up" />
          </div>
        </Show>
        <Show when={isSignedIn()}>
          <h3 class="text-xl font-bold mb-8">Signed in: {getUserName()}</h3>
          <Button onClick={() => signOut()} text="Sign out" />
          <HistoricalStatisticsContainer />
        </Show>
      </div>
    </div>
  )
}

export default ProfilePage
