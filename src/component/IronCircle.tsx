import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'


export default function IconCircle({ icon, aria }: { icon: any; aria?: string }) {
return (
<div style={{width:48,height:48,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',background:'#222',color:'#fff'}} aria-label={aria}>
<FontAwesomeIcon icon={icon as IconDefinition} />
</div>
)
}