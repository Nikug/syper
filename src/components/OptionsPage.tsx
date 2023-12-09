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
        <div class="mb-8 bg-theme-surface0 p-8 rounded-lg">
          <UserOptions />
        </div>
      </PageContainer>
    </>
  )
}

export default OptionsPage
