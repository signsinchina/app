/**
 * Created by shu on 24/6/2017.
 */

import { Dimensions } from 'react-native'

export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height

export const TABBAR_HEIGHT = 50

export const BOARD_MARGIN = 20
export const BOARD_BORDER_RADIUS = 20

export const CARD_MARGIN = 10
export const CARD_SIZE = (SCREEN_WIDTH - BOARD_MARGIN * 2 - CARD_MARGIN * 3) / 2
export const CARD_BORDER_RADIUS = 10
export const CARD_TITLE_HEIGHT = 30

export const CARD_PLACEHOLDERS = [
  require('./statics/signsinchina_Jun2017/16463925_241764496281426_545631635966525440_n.jpg'),
  require('./statics/signsinchina_Jun2017/16789558_399005220454714_1872878269615833088_n.jpg'),
  require('./statics/signsinchina_Jun2017/16789691_769040803271484_1299234092440616960_n.jpg'),
  require('./statics/signsinchina_Jun2017/17266064_768368239987928_3072547241949396992_n.jpg'),
  require('./statics/signsinchina_Jun2017/17332862_1873383199617979_7693076117002911744_n.jpg'),
  require('./statics/signsinchina_Jun2017/17495345_1869762636616539_1836816083521110016_n.jpg'),
  require('./statics/signsinchina_Jun2017/17818708_1142424625867911_8825197133649936384_n.jpg'),
  require('./statics/signsinchina_Jun2017/18161724_128206574392073_4976305987121053696_n.jpg'),
  require('./statics/signsinchina_Jun2017/18162225_335420656872645_4522174699500732416_n.jpg'),
  require('./statics/signsinchina_Jun2017/18252552_138841749990872_6333834304870678528_n.jpg'),
  require('./statics/signsinchina_Jun2017/18580776_1935242936757829_3849132231633141760_n.jpg'),
]
