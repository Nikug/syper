import { Component } from 'solid-js'
import { PageContainer } from './PageContainer'
import { UserOptions } from './UserOptions'

const OptionsPage: Component = () => {
  return (
    <PageContainer>
      <div class="mb-8 bg-theme-surface0 p-8 rounded-lg">
        <UserOptions />
      </div>
    </PageContainer>
  )
}

export default OptionsPage
