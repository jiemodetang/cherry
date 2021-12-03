import React from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { Text, Flex, LinkExternal, Skeleton } from '@pancakeswap/uikit'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  infoAddress?: string
  removed?: boolean
  totalValueFormatted?: string
  lpLabel?: string
  addLiquidityUrl?: string
}

const Wrapper = styled.div`
  margin-top: 24px;
`


const DetailsSection: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  infoAddress,
  removed,
  totalValueFormatted,
  lpLabel,
  addLiquidityUrl,
}) => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <Flex justifyContent="space-between">
        <Text>{t('Total Liquidity')}:</Text>
        {totalValueFormatted ? <Text>{totalValueFormatted}</Text> : <Skeleton width={75} height={25} />}
      </Flex>
      {!removed && (
        <LinkExternal href={addLiquidityUrl} className='color7166B0'>{t('Get %symbol%', { symbol: lpLabel })}</LinkExternal>
      )}
      <LinkExternal href={bscScanAddress} className='color7166B0'>{t('View Contract')}</LinkExternal>
      <LinkExternal href={infoAddress} className='color7166B0' >{t('See Pair Info')}</LinkExternal>
    </Wrapper>
  )
}

export default DetailsSection
