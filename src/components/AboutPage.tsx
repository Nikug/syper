import { Component } from 'solid-js'
import { PageContainer } from './PageContainer'
import { References } from './References'
import { GeneralInformation } from './GeneralInformation'
import { Meta, Title } from '@solidjs/meta'

const AboutPage: Component = () => {
  return (
    <>
      <Title>Syper / About</Title>
      <Meta name="description" content="Information about Syper, relevant links and references." />
      <PageContainer>
        <div class="bg-theme-surface0 p-8 rounded-xl mb-16">
          <GeneralInformation />
        </div>
        <div class="bg-theme-surface0 p-8 rounded-xl mb-16">
          <References />
        </div>
      </PageContainer>
    </>
  )
}

export default AboutPage
