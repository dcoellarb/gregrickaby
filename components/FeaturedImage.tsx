import type {FeaturedImage} from '@/lib/types'
import Image from 'next/image'

// REVIEW: looks like hidden should be optional
export interface FeaturedImageProps {
  image: FeaturedImage
  hidden: boolean
}

/**
 * Featured Image component.
 */
export default function FeaturedImage({
  image,
  hidden = false
}: Readonly<FeaturedImageProps>) {
  // If there's no image, or it's hidden, don't render anything.
  if (!image || hidden) {
    return null
  }

  // REVIEW: image? optional chaining is not needed since is already validated above
  // and node? chaining is contradicting FeaturedImage type where node is not optional
  // REVIEW: we should add onError fallback to local image in case the can not load,
  // is great that we have a centralized component to handle images then adding that onError is simple
  return (
    <Image
      alt={image?.node?.altText}
      height="400"
      src={image?.node?.sourceUrl}
      width="896"
      priority={true}
    />
  )
}
