import { ComponentMeta, ComponentStory } from '@storybook/react'
import React, { useState } from 'react'
import { MbThingCard } from '../../../components/cards/thing/ThingCard'
import { MbDropdownMenu } from '../../../components/dropdowns/dropdown-menu/DropdownMenu'
import { MbMenuWrapper } from '../../../components/dropdowns/menu-wrapper/MenuWrapper'
import { MbIcon } from '../../../components/icon/Icon'
import { EIconName } from '../../../consts/icons'

export default {
  title: 'Components/Cards',
  component: MbThingCard,
  argTypes: {},
} as ComponentMeta<typeof MbThingCard>

const Template: ComponentStory<typeof MbThingCard> = (args) => {
  const [openExtraMenu, setOpenExtraMenu] = useState(false)

  const items = [
    {
      content: <span>Share</span>,
    },
  ]

  const icon = (
    <MbMenuWrapper setIsOpen={setOpenExtraMenu}>
      <div
        onClick={() => {
          console.log('marcel')
          setOpenExtraMenu(!openExtraMenu)
        }}
      >
        <MbIcon
          name={EIconName.MORE}
          size="24px"
          color="black"
          darkColor="white"
        />
      </div>
      <MbDropdownMenu items={items} isOpen={openExtraMenu} />
    </MbMenuWrapper>
  )

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-24">
      <MbThingCard cardInfo={{...args.cardInfo, upperRightElement: icon}} />
    </div>
  )
}

export const Thing = Template.bind({})
Thing.args = {
  cardInfo: {
    upperLeftText: '1',
    centerElement: (
      <img
        className="h-full w-full object-cover"
        src="https://coldcdn.com/api/cdn/bronil/JXl58b_p9iYzeFutFC5GcDCjsxppyFt5rRkQt4Su4LU"
      />
    ),
    isCenterImage: true,
    midLeftText: 'Thing Name',
    midRightText: '10 N',
    botLeftImage:
      'https://coldcdn.com/api/cdn/bronil/JXl58b_p9iYzeFutFC5GcDCjsxppyFt5rRkQt4Su4LU',
    botRightText: '5/10',
    botRightIcon: EIconName.EDITIONS,
    onBotLeftImageClick: () => null,
    onCenterElementClick: () => null,
    onUpperLeftClick: () => null,
    onUpperRightClick: () => null,
  },
  loading: false,
}
