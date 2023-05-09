import category from './category'
import product from './product'
import {user, account} from 'next-auth-sanity/schemas'
export const schemaTypes = [category, product, user, account]
