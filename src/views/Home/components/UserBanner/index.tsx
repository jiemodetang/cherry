import React from 'react'
import { Box, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'
import HarvestCard from './HarvestCard'
import UserDetail from './UserDetail'

const StyledCard = styled(Box)`
  border-bottom: 1px solid #D53B79;
  border-left: 1px solid #D53B79;
  border-right: 1px solid #D53B79 ;
  border-radius: ${({ theme }) => `0 0 ${theme.radii.card} ${theme.radii.card}`};
  background:  url(/images/mImg/blg.png);
`

const UserBanner = () => {
  return (
    <StyledCard p={['16px', null, null, '24px']}>
      <Flex alignItems="center" justifyContent="center" flexDirection={['column', null, null, 'row']}>
        <Flex flex="1" mr={[null, null, null, '32px']}>
          <UserDetail />
        </Flex>
        <Flex flex="1" width={['100%', null, 'auto']}>
          <HarvestCard />
        </Flex>
      </Flex>
    </StyledCard>
  )
}

export default UserBanner
