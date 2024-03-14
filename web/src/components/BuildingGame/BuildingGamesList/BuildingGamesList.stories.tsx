// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import BuildingGamesList from './BuildingGamesList'

const meta: Meta<typeof BuildingGamesList> = {
  component: BuildingGamesList,
}

export default meta

type Story = StoryObj<typeof BuildingGamesList>

export const Primary: Story = {}
