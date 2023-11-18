import { Component } from 'solid-js'
import { PageContainer } from './PageContainer'
import { References } from './References'
import { GeneralInformation } from './GeneralInformation'

const AboutPage: Component = () => {
  return (
    <PageContainer>
      <div class="bg-theme-surface0 p-8 rounded-xl mb-16">
        <GeneralInformation />
      </div>
      <div class="bg-theme-surface0 p-8 rounded-xl mb-16">
        <References />
      </div>
    </PageContainer>
  )
}

export default AboutPage
