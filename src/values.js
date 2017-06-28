/**
 * Created by shu on 24/6/2017.
 */

import { Dimensions, PixelRatio } from 'react-native'

export const PIXEL = 1 / PixelRatio.get()

export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height

export const TABBAR_HEIGHT = 50

export const BOARD_MARGIN = 25
export const BOARD_BORDER_RADIUS = 25
export const BOARD_WIDTH = SCREEN_WIDTH - BOARD_MARGIN * 2

export const CARD_MARGIN = 10
export const CARD_SIZE = (SCREEN_WIDTH - BOARD_MARGIN * 2 - CARD_MARGIN * 3) / 2
export const CARD_BORDER_RADIUS = 10
export const CARD_TITLE_HEIGHT = 60
