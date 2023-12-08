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

import BuildingGameCell from './BuildingGameCell'

const meta: Meta<typeof BuildingGameCell> = {
  component: BuildingGameCell,
}

export default meta

type Story = StoryObj<typeof BuildingGameCell>

export const Primary: Story = {}
