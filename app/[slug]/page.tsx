import SinglePage from '@/components/SinglePage'
import config from '@/lib/config'
import {rssFeedRedirect} from '@/lib/functions'
import getPageBySlug from '@/lib/queries/getPageBySlug'
import getPages from '@/lib/queries/getPages'
import {Metadata} from 'next'
import {notFound} from 'next/navigation'

/**
 * Time-based Revalidation.
 *
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#time-based-revalidation
 */
export const revalidate = 3600

/**
 * Generate the static routes at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  // Get pages.
  const pages = await getPages()

  // No pages? Bail...
  if (!pages) {
    return []
  }

  // Return the slugs for each page.
  return pages.map((page: {slug: string}) => ({
    slug: page.slug
  }))
}

/**
 * Generate the metadata for each static route at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata({
  params
}: {
  params: {slug: string}
}): Promise<Metadata | null> {
  // Get the page.
  const page = await getPageBySlug(params.slug)

  // No page? Bail...
  if (!page) {
    return {}
  }

  return {
    title: `${page.seo.title} - ${config.siteName}`,
    description: page.seo.metaDesc,
    openGraph: {
      title: `${page.title} - ${config.siteName}`,
      description: page.excerpt,
      url: `${config.siteUrl}/blog/${params.slug}`,
      siteName: config.siteName,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: page?.featuredImage?.node?.sourceUrl,
          width: page?.featuredImage?.node?.mediaDetails?.width,
          height: page?.featuredImage?.node?.mediaDetails?.height,
          alt: page?.featuredImage?.node?.altText
        }
      ]
    }
  }
}

/**
 * The single page catch-all route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function Page({params}: {params: {slug: string}}) {
  // Maybe redirect to the RSS feed.
  rssFeedRedirect(params.slug)

  // Fetch a page from WordPress.
  const page = await getPageBySlug(params.slug)

  // No page? Throw a 404.
  if (!page) {
    notFound()
  }

  return <SinglePage page={page} />
}
