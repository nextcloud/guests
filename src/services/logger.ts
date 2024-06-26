import { getLoggerBuilder } from '@nextcloud/logger'

export const logger = getLoggerBuilder()
    .setApp('guests')
    .detectUser()
    .build()
