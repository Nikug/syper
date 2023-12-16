import { Component } from 'solid-js'
import { PageContainer } from './PageContainer'
import { Meta, Title } from '@solidjs/meta'

const PrivacyPage: Component = () => {
  return (
    <>
      <Title>Syper / Privacy</Title>
      <Meta
        name="description"
        content="A General Data Protection Regulation (GDPR) compliant privacy policy explaining what data Syper collects and how it is used."
      />
      <PageContainer>
        <div class="bg-theme-surface0 p-8 rounded-xl mb-16">
          <h1 class="h1">Privacy policy</h1>
          <p>
            This privacy policy will explain how Syper uses personal data. Note that data is only
            collected if you create an account, which is completely optional.
          </p>
          <h2 class="h2 mt-8">What data we collect?</h2>
          <p>We collect:</p>
          <ul class="ul">
            <li>Your email</li>
            <li>Information about each typing test</li>
            <li>Your selected options</li>
          </ul>
          <h2 class="h2 mt-8">How do we collect your data?</h2>
          <p>
            You provide directly most of the data we collect by using Syper. We collect data when
            you:
          </p>
          <ul class="ul">
            <li>Sign up</li>
            <li>Complete a typing test</li>
            <li>Change your options in the website</li>
          </ul>
          <h2 class="h2 mt-8">How will we use your data?</h2>
          <p>Syper collects data for the following reasons:</p>
          <ul class="ul">
            <li>
              You can view your typing test result history and statistics calculated from the
              history
            </li>
            <li>Your settings are remembered</li>
          </ul>
          <h2 class="h2 mt-8">How do we store your data?</h2>
          <p>
            Your data is stored securely using{' '}
            <a href="https://supabase.com" class="link">
              Supabase
            </a>{' '}
            as the database provider. Database is located in EU.
          </p>
          <h2 class="h2 mt-8">What are your data protection rights?</h2>
          <p>You are entitled to the following actions:</p>
          <ul class="ul mb-4">
            <li>The right to access: You can request copies of your personal data</li>
            <li>The right to rectification: You can request changes to your personal data</li>
            <li>The right to erasure: You can request the deletion of your personal data</li>
          </ul>
          <p>
            If you make a request, we have one month to respond to you. You can contact us here:{' '}
            <a href="mailto:sypertyping@gmail.com" class="link">
              sypertyping@gmail.com
            </a>
          </p>
          <h2 class="h2 mt-8">What are cookies?</h2>
          <p>
            Cookies are text files placed on your computer to collect standard Internet log
            information and visitor behavior information. When you visit our websites, we may
            collect information from you automatically through cookies or similar technology. For
            further information, visit{' '}
            <a href="https://allaboutcookies.org" class="link">
              allaboutcookies.org
            </a>
          </p>
          <h2 class="h2 mt-8">How do we use cookies?</h2>
          <p>
            Syper uses cookies to provide a functionality. This includes the following functions:
          </p>
          <ul class="ul">
            <li>Store your settings</li>
            <li>Keep you signed in</li>
          </ul>
          <h2 class="h2 mt-8">How to manage cookies?</h2>
          <p>
            You can set your browser not to accept cookies. This can impact some features of Syper.
          </p>
          <h2 class="h2 mt-8">Privacy policies of other websites</h2>
          <p>
            Syper website contains links to other websites. Our privacy policy applies only to our
            website, so if you click on a link to another website, you should read their privacy
            policy.
          </p>
          <h2 class="h2 mt-8">How to contact us</h2>
          <p>
            For all questions about this privacy policy, or if you want to exercise your data
            protection rights, please contact us at{' '}
            <a href="mailto:sypertyping@gmail.com" class="link">
              sypertyping@gmail.com
            </a>
          </p>
          <h2 class="h2 mt-8">Privacy policy updates</h2>
          <ul>
            <li>20.11.2023: Created privacy policy</li>
          </ul>
          <div class="mb-32" />
        </div>
      </PageContainer>
    </>
  )
}

export default PrivacyPage
