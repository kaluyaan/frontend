import DuplicateSentenceClient from '@/components/duplicate-sentence/DuplicateSentenceClient';
import { Metadata } from 'next';

// SEO Metadata for Server Component
export const metadata: Metadata = {
  title: 'Duplicate Sentence Generator - AI-Powered Paraphrasing Tool | Free Online',
  description: 'Transform your sentences with our AI-powered duplicate sentence generator. Create multiple variations with adjustable similarity levels and tones. Free paraphrasing tool for writers, students, and content creators.',
  keywords: [
    'duplicate sentence generator',
    'paraphrasing tool',
    'sentence rewriter',
    'AI paraphraser',
    'sentence variations',
    'text rephraser',
    'reword sentences',
    'synonym generator',
    'sentence transformer',
    'content rewriter',
    'duplicate content creator',
    'sentence paraphraser',
    'free paraphrasing tool',
    'online sentence generator',
    'writing assistant',
    'text variation tool'
  ],
  authors: [{ name: 'KaluYaan' }],
  creator: 'KaluYaan',
  publisher: 'KaluYaan',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kaluyaan.com/duplicate-sentence',
    title: 'Duplicate Sentence Generator - AI-Powered Paraphrasing Tool',
    description: 'Transform your sentences with AI-powered paraphrasing. Choose similarity levels and tones to create perfect variations instantly.',
    siteName: 'KaluYaan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Duplicate Sentence Generator - AI-Powered Tool',
    description: 'Transform sentences with AI-powered paraphrasing. Adjust similarity levels and tones for perfect variations.',
    images: ['https://kaluyaan.com/duplicate-sentence-preview.jpg'],
    creator: '@kaluyaan',
  },
  alternates: {
    canonical: 'https://kaluyaan.com/duplicate-sentence',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Sentence Generator',
  },
};

// Server Component
export default function DuplicateSentencePage() {
  // Schema.org JSON-LD for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Duplicate Sentence Generator',
    description: 'AI-powered sentence paraphrasing tool with adjustable similarity levels and tone variations',
    url: 'https://kaluyaan.com/duplicate-sentence',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'AI-powered sentence generation',
      'Adjustable similarity levels',
      'Multiple tone variations (formal, casual, professional)',
      'Instant results',
      'Rich synonym database',
      'Copy to clipboard functionality',
      'Free to use'
    ],
    author: {
      '@type': 'Organization',
      name: 'KaluYaan',
    },
  };

  // FAQ Schema for better SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a duplicate sentence generator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A duplicate sentence generator is an AI-powered tool that creates multiple variations of your original sentence while maintaining the same meaning. It helps writers, students, and content creators generate alternative phrasings quickly and easily.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does the similarity level work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The similarity level controls how close the generated sentences are to your original text. Lower levels create more conservative changes with minor word substitutions, while higher levels produce more aggressive transformations with significant restructuring.'
        }
      },
      {
        '@type': 'Question',
        name: 'What tone options are available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can choose from three tone options: Formal (academic and professional language), Casual (relaxed and conversational style), and Professional (business-appropriate with clear communication).'
        }
      },
      {
        '@type': 'Question',
        name: 'Is the duplicate sentence generator free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our duplicate sentence generator is completely free to use with no registration required. You can generate unlimited sentence variations.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 style={{ position: 'absolute', left: '-9999px' }}>
        Free Duplicate Sentence Generator - AI-Powered Paraphrasing Tool Online
      </h1>

      <DuplicateSentenceClient />

      <article style={{ position: 'absolute', left: '-9999px' }}>
        <h2>About Duplicate Sentence Generator</h2>
        <p>
          {`Our duplicate sentence generator is a powerful AI-powered tool designed to help writers, students, 
          content creators, and professionals create multiple variations of their sentences. Whether you need 
          to paraphrase content, avoid repetition, or explore different ways to express your ideas, our tool 
          provides instant, high-quality results.`}
        </p>

        <h2>Key Features</h2>
        <ul>
          <li><strong>Precision Control:</strong> Adjust similarity levels from 1 to 10 for conservative or aggressive transformations</li>
          <li><strong>Tone Variations:</strong> Choose from formal, casual, or professional writing styles</li>
          <li><strong>Rich Dictionary:</strong> Powered by comprehensive synonym database for natural variations</li>
          <li><strong>Instant Results:</strong> Generate up to 5 unique sentence variations in seconds</li>
          <li><strong>Copy Functionality:</strong> Easily copy generated sentences to your clipboard</li>
          <li><strong>Free to Use:</strong> No registration or payment required</li>
        </ul>

        <h2>How to Use the Duplicate Sentence Generator</h2>
        <ol>
          <li>Enter your original sentence in the text input field</li>
          <li>Adjust the similarity level slider (1-10) based on how different you want the variations</li>
          <li>Select your preferred tone: formal, casual, or professional</li>
          <li>{`Click "Generate Similar Sentences" button`}</li>
          <li>Review the generated variations and copy your favorites</li>
        </ol>

        <h2>Understanding Similarity Levels</h2>
        <p>
          The similarity level determines how close the generated sentences are to your original text:
        </p>
        <ul>
          <li><strong>Level 1-3 (Low):</strong> Minor word substitutions, very similar to original</li>
          <li><strong>Level 4-6 (Medium):</strong> Moderate changes with synonym replacements</li>
          <li><strong>Level 7-10 (High):</strong> Significant restructuring with maximum variation</li>
        </ul>

        <h2>Tone Options Explained</h2>
        <h3>Formal Tone</h3>
        <p>
          {`Perfect for academic papers, research documents, and professional publications. Uses sophisticated 
          vocabulary and maintains a scholarly tone.`}
        </p>

        <h3>Casual Tone</h3>
        <p>
          {`Ideal for blog posts, social media content, and informal writing. Creates a relaxed, 
          conversational style that connects with readers.`}
        </p>

        <h3>Professional Tone</h3>
        <p>
         {` Best for business communications, reports, and corporate content. Balances formality with 
          clarity and accessibility.`}
        </p>

        <h2>Use Cases</h2>
        <ul>
          <li><strong>Content Writers:</strong> Create diverse content variations for SEO and engagement</li>
          <li><strong>Students:</strong> Paraphrase research and avoid plagiarism in academic work</li>
          <li><strong>Marketers:</strong> Generate multiple ad copy variations for A/B testing</li>
          <li><strong>Bloggers:</strong> Rewrite sentences for better readability and flow</li>
          <li><strong>Social Media Managers:</strong> Create varied posts for different platforms</li>
          <li><strong>Email Marketers:</strong> Test different subject lines and message variations</li>
        </ul>

        <h2>Benefits of Using Our Tool</h2>
        <ul>
          <li>Save time on manual sentence rewriting</li>
          <li>Improve writing quality with diverse expressions</li>
          <li>Avoid repetitive language in your content</li>
          <li>Learn new ways to express ideas</li>
          <li>Enhance vocabulary through synonym suggestions</li>
          <li>Maintain original meaning while changing structure</li>
          <li>{`Perfect for overcoming writer's block`}</li>
        </ul>

        <h2>Tips for Best Results</h2>
        <ul>
          <li>Start with clear, well-structured original sentences</li>
          <li>Experiment with different similarity levels to find your preference</li>
          <li>Try multiple tones to see which fits your content best</li>
          <li>Review generated sentences for context appropriateness</li>
          <li>Combine elements from different variations for unique results</li>
          <li>Use the tool iteratively to refine your content</li>
        </ul>

        <h2>Privacy and Security</h2>
        <p>
          Your sentences are processed locally and are not stored on our servers. We respect your privacy 
          and ensure that your content remains confidential.
        </p>

        <h2>Frequently Asked Questions</h2>
        
        <h3>Is this tool free?</h3>
        <p>
          Yes, our duplicate sentence generator is completely free with no hidden costs or registration requirements.
        </p>

        <h3>How many variations can I generate?</h3>
        <p>
          The tool generates 5 unique variations per request. You can generate unlimited variations by 
          running the tool multiple times.
        </p>

        <h3>Can I use this for commercial purposes?</h3>
        <p>
          Yes, you can use the generated sentences for any purpose, including commercial projects, 
          without restrictions.
        </p>

        <h3>Does it work with other languages?</h3>
        <p>
          Currently, our tool is optimized for English sentences. Support for additional languages 
          may be added in future updates.
        </p>

        <h3>Is the generated content plagiarism-free?</h3>
        <p>
          While the tool creates unique variations, we recommend reviewing the generated content and 
          ensuring it meets your specific requirements and standards.
        </p>
      </article>
    </>
  );
}