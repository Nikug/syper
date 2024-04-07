import { Component } from 'solid-js'
import { PageContainer } from './PageContainer'
import { UserOptions } from './UserOptions'
import { Meta, Title } from '@solidjs/meta'

const OptionsPage: Component = () => {
  return (
    <>
      <Title>Syper / Options</Title>
      <Meta name="description" content="Customize your Syper typing experience." />
      <PageContainer>
        <div class="bg-theme-surface0 md:p-8 p-2 rounded-lg">
          <UserOptions />
        </div>
      </PageContainer>
    </>
  )
}

export default OptionsPage
