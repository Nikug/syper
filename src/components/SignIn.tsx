import { Component, Show, createSignal } from 'solid-js'
import { Input } from './Input'
import { Button } from './Button'
import { signIn, signUp } from '../authentication/Supabase'
import { handleInitialSetupAfterSignIn } from '../helpers/stateHelpers'

export const SignIn: Component = () => {
  const [email, setEmail] = createSignal<string>('')
  const [password, setPassword] = createSignal<string>('')
  const [showButtons, setShowButtons] = createSignal(true)
  const [showEmailVerification, setShowEmailVerification] = createSignal(false)
  const [showSignInFailed, setShowSignInFailed] = createSignal(false)
  const [showSignUpFailed, setShowSignUpFailed] = createSignal(false)

  const hideMessages = () => {
    setShowSignInFailed(false)
    setShowSignUpFailed(false)
    setShowEmailVerification(false)
  }

  const handleSignIn = async () => {
    hideMessages()
    const error = await signIn(email(), password())
    if (error) {
      setShowSignInFailed(true)
    }
    await handleInitialSetupAfterSignIn()
  }

  const handleSignUp = async () => {
    hideMessages()
    const error = await signUp(email(), password())
    if (error) {
      setShowSignUpFailed(true)
      return
    }

    setShowButtons(false)
    setShowEmailVerification(true)
  }

  return (
    <div class="max-w-sm">
      <h3 class="h3">Sign in to save your results</h3>
      <form
        class="pb-4"
        onSubmit={(e) => {
          e.preventDefault()
          handleSignIn()
        }}
      >
        <div>
          <div class="mb-2">
            <label for="email" class="block">
              Email
            </label>
            <Input
              id="email"
              class="w-full"
              value={email()}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <label for="password" class="block">
            Password
          </label>
          <Input
            id="password"
            class="w-full"
            type="password"
            value={password()}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <input type="submit" hidden />
      </form>
      <Show when={showSignInFailed()}>
        <p class="text-theme-danger mb-4">Could not sign in. Check your email and password.</p>
      </Show>
      <Show when={showSignUpFailed()}>
        <p class="text-theme-danger mb-4">Could not sign up.</p>
      </Show>
      <Show when={showButtons()}>
        <div class="flex flex-col w-full items-center mt-2">
          <Button class="w-full" onClick={handleSignIn} text="Sign in" />
          <p class="my-2">or</p>
          <Button class="w-full" onClick={handleSignUp} text="Sign up" />
        </div>
      </Show>
      <Show when={showEmailVerification()}>
        <p>
          Verification email send from <span class="font-bold">noreply@syper.app</span>! Click the
          link in the email to sign in.
        </p>
      </Show>
    </div>
  )
}
