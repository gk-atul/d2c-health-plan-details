# Pattern Library

## Purpose

Use these rows for full charts, audits, guidelines, and developer handoff. All values are custom Acko values and follow the source-of-truth curves in `curves.md`.

## Navigation

| UI motion | Acko use case | Duration | Frames at 60fps | Ease type | Ease value |
|---|---|---:|---:|---|---|
| New page open right-to-left | quote page to policy details, claim step to next step; default for most forward navigation | 500-600ms | 30-36 | ease-out | 100 to 0, out 50%, in 40% |
| Right-to-left destination element reveal | page elements appear as incoming page opens; y +12-24px to 0 and opacity 0% to 100% | 260-340ms each | 16-20 | ease-out | 100 to 0, out 50%, in 40%; 50-60ms top-to-bottom stagger |
| Back page left-to-right | return from policy detail or claim step | 350-450ms | 21-27 | ease-in | 0 to 100, out 40%, in 50% |
| Page fade transition | same-level screen change, dashboard section switch | 300-400ms | 18-24 | ease-out | 100 to 0, out 50%, in 40% |
| Section reveal on page load | dashboard cards, policy sections, claim status blocks | 300-400ms | 18-24 | ease-out | 100 to 0, out 50%, in 40% |
| Step transition | quote, claim, renewal, kyc multi-step flow | 250-400ms | 15-24 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |

## Surfaces

| UI motion | Acko use case | Duration | Frames at 60fps | Ease type | Ease value |
|---|---|---:|---:|---|---|
| Bottom sheet open | plan options, filters, add-ons, document options | 500-600ms | 30-36 | ease-out | 100 to 0, out 50%, in 40% |
| Bottom sheet to page | sheet-origin task becomes full page: payment detail, document upload, support ticket, add-on detail | 500-600ms simple or 500-650ms morph | 30-36 or 30-39 | ease-out for upward motion; ease-in-out for size/radius morph | 100 to 0 upward; 0 to 100 to 0 morph |
| Bottom sheet close | dismiss sheet | 350-450ms | 21-27 | ease-in | 0 to 100, out 40%, in 50% |
| Modal open | otp modal, confirmation modal, permission modal | 500-600ms | 30-36 | ease-out | 100 to 0, out 50%, in 40% |
| Modal close | modal dismiss or cancel | 350-450ms | 21-27 | ease-in | 0 to 100, out 40%, in 50% |
| Drawer open | side menu, support menu, account menu | 500-600ms | 30-36 | ease-out | 100 to 0, out 50%, in 40% |
| Drawer close | side menu dismiss | 350-450ms | 21-27 | ease-in | 0 to 100, out 40%, in 50% |
| Dropdown open | select city, vehicle type, policy type | 240-320ms | 14-19 | ease-out | 100 to 0, out 50%, in 40% |
| Dropdown close | dropdown dismiss | 180-240ms | 11-14 | ease-in | 0 to 100, out 40%, in 50% |
| Tooltip open | helper text, insurance explanation | 180-240ms | 11-14 | ease-out | 100 to 0, out 50%, in 40% |
| Tooltip close | helper text dismiss | 140-200ms | 8-12 | ease-in | 0 to 100, out 40%, in 50% |

## Buttons and CTAs

| UI motion | Acko use case | Duration | Frames at 60fps | Ease type | Ease value |
|---|---|---:|---:|---|---|
| Primary button press | buy policy, renew, continue, submit claim | 80-100ms | 5-6 | ease-out | 100 to 0, out 50%, in 40% |
| Primary button release | button returns after tap | 120-160ms | 7-10 | ease-out | 100 to 0, out 50%, in 40% |
| Secondary button press | cancel, edit, view details | 80-100ms | 5-6 | ease-out | 100 to 0, out 50%, in 40% |
| Icon button tap | back, close, help, share, download policy | 120-160ms | 7-10 | ease-out | 100 to 0, out 50%, in 40% |
| Button loading transition | continue button changes to processing | 180-240ms | 11-14 | ease-out | 100 to 0, out 50%, in 40% |
| Button success state | label changes to success/checkmark | 500-700ms | 30-42 | ease-out | 100 to 0, out 50%, in 40% |
| Disabled button state | cta becomes unavailable | 160-220ms | 10-13 | ease-out | 100 to 0, out 50%, in 40% |

## Cards and containers

| UI motion | Acko use case | Duration | Frames at 60fps | Ease type | Ease value |
|---|---|---:|---:|---|---|
| Policy card reveal | dashboard policy card appears | 240-320ms | 14-19 | ease-out | 100 to 0, out 50%, in 40% |
| Claim card reveal | active claim card appears | 240-320ms | 14-19 | ease-out | 100 to 0, out 50%, in 40% |
| Renewal card reveal | renewal reminder appears | 240-320ms | 14-19 | ease-out | 100 to 0, out 50%, in 40% |
| Card tap feedback | tap policy, claim, add-on card | 80-100ms | 5-6 | ease-out | 100 to 0, out 50%, in 40% |
| Card expand origin-aware | policy, claim, renewal card; card morphs from exact position to target | 500-650ms | 30-39 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |
| Card expand target half screen | expands to about 60% width and 65% height, centered | 500-650ms | 30-39 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |
| Card expand target large sheet | expands to viewport minus 16px padding on all sides | 500-650ms | 30-39 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |
| Card expand target full page | expands to 100% viewport, radius 0, becomes a new page | 500-650ms | 30-39 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |
| Card collapse back | collapses to source card's original position and size | 400-500ms | 24-30 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |
| Card expand content timing | mini content fades out first 35%; detail content fades in after 50%; close control appears final 25% | timing inside expand | timing inside expand | uses parent curve | uses parent curve |
| Accordion expand | coverage details, exclusions, faqs | 220-320ms | 13-19 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |
| Accordion collapse | faq or coverage closes | 180-260ms | 11-16 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |
| List reveal | policy list, claim list, document list | 260-340ms | 16-20 | ease-out | 100 to 0, out 50%, in 40% |
| List stagger delay | delay between list items | 40-60ms | 2-4 | same as reveal | same as reveal |

## Forms and inputs

| UI motion | Acko use case | Duration | Frames at 60fps | Ease type | Ease value |
|---|---|---:|---:|---|---|
| Input field focus | name, mobile number, vehicle number, email | 160-220ms | 10-13 | ease-out | 100 to 0, out 50%, in 40% |
| Floating label move | label moves above active input | 160-220ms | 10-13 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |
| Helper text reveal | field guidance appears | 180-240ms | 11-14 | ease-out | 100 to 0, out 50%, in 40% |
| Error text reveal | invalid otp, missing field, wrong document | 180-240ms | 11-14 | ease-out | 100 to 0, out 50%, in 40% |
| Form field error shake | localized correction | 200-260ms | 12-16 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |
| Valid field success | verified field tick | 300-500ms | 18-30 | ease-out | 100 to 0, out 50%, in 40% |
| OTP digit fill | otp box receives typed digit | 120-160ms | 7-10 | ease-out | 100 to 0, out 50%, in 40% |
| OTP verification success | otp verified checkmark | 500-700ms | 30-42 | ease-out | 100 to 0, out 50%, in 40% |
| OTP error shake | wrong otp | 200-260ms | 12-16 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |

## Selection and controls

| UI motion | Acko use case | Duration | Frames at 60fps | Ease type | Ease value |
|---|---|---:|---:|---|---|
| Chip select | add-ons, coverage type, plan filter | 160-200ms | 10-12 | ease-out | 100 to 0, out 50%, in 40% |
| Chip deselect | remove selected add-on/filter | 140-180ms | 8-11 | ease-in | 0 to 100, out 40%, in 50% |
| Toggle knob movement | auto-renewal, notification setting | 180-220ms | 11-13 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |
| Radio select | choose plan, idv option, payment option | 160-220ms | 10-13 | ease-out | 100 to 0, out 50%, in 40% |
| Checkbox select | terms, add-on selection | 160-220ms | 10-13 | ease-out | 100 to 0, out 50%, in 40% |
| Slider drag | idv, deductible, price range | finger-controlled | real time | linear while dragging | constant, direct finger follow |
| Slider settle | slider stops after drag | 220-320ms | 13-19 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |
| Tab indicator movement | policy, claims, support tabs | 220-280ms | 13-17 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |
| Tab content switch | tab content fades or shifts | 220-280ms | 13-17 | ease-out | 100 to 0, out 50%, in 40% |

## Quote and pricing

| UI motion | Acko use case | Duration | Frames at 60fps | Ease type | Ease value |
|---|---|---:|---:|---|---|
| Quote result reveal | premium quote appears after calculation | 300-400ms | 18-24 | ease-out | 100 to 0, out 50%, in 40% |
| Premium amount update | price changes after add-on/filter | 240-340ms | 14-20 | ease-out | 100 to 0, out 50%, in 40% |
| Plan comparison card reveal | multiple plans appear | 260-340ms | 16-20 | ease-out | 100 to 0, out 50%, in 40% |
| Coverage expansion | open coverage details | 220-320ms | 13-19 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |
| Add-on added success | add-on selected and premium updates | 300-500ms | 18-30 | ease-out | 100 to 0, out 50%, in 40% |
| Discount applied motion | coupon or offer applied | 500-700ms | 30-42 | ease-out | 100 to 0, out 50%, in 40% |

## Payments

| UI motion | Acko use case | Duration | Frames at 60fps | Ease type | Ease value |
|---|---|---:|---:|---|---|
| Payment method sheet open | upi, card, net banking options | 500-600ms | 30-36 | ease-out | 100 to 0, out 50%, in 40% |
| Payment method sheet close | payment sheet dismiss | 350-450ms | 21-27 | ease-in | 0 to 100, out 40%, in 50% |
| Payment processing loader | payment in progress | 800-1200ms loop | 48-72 | linear | constant, 0% influence |
| Payment success | policy purchased successfully | 600-800ms | 36-48 | ease-out | 100 to 0, out 50%, in 40% |
| Payment failed error reveal | failed message appears | 180-240ms | 11-14 | ease-out | 100 to 0, out 50%, in 40% |
| Retry CTA reveal | retry payment button appears | 240-320ms | 14-19 | ease-out | 100 to 0, out 50%, in 40% |

## Claims

| UI motion | Acko use case | Duration | Frames at 60fps | Ease type | Ease value |
|---|---|---:|---:|---|---|
| Claim step page open | start claim, damage details, upload docs | 500-600ms | 30-36 | ease-out | 100 to 0, out 50%, in 40% |
| Claim step back | return to previous claim step | 350-450ms | 21-27 | ease-in | 0 to 100, out 40%, in 50% |
| Claim progress step update | submitted to review to approved | 250-400ms | 15-24 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |
| Claim status card reveal | active claim status appears | 260-340ms | 16-20 | ease-out | 100 to 0, out 50%, in 40% |
| Claim submitted success | claim successfully submitted | 600-800ms | 36-48 | ease-out | 100 to 0, out 50%, in 40% |
| Claim warning reveal | missing document, action required | 180-240ms | 11-14 | ease-out | 100 to 0, out 50%, in 40% |
| Claim error correction | invalid upload, wrong details | 200-260ms | 12-16 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |

## Document upload

| UI motion | Acko use case | Duration | Frames at 60fps | Ease type | Ease value |
|---|---|---:|---:|---|---|
| Upload option sheet open | camera, gallery, file upload | 500-600ms | 30-36 | ease-out | 100 to 0, out 50%, in 40% |
| Upload card reveal | uploaded document preview appears | 240-320ms | 14-19 | ease-out | 100 to 0, out 50%, in 40% |
| Upload progress bar | document upload progress | based on upload | real time | linear | data-driven |
| Upload processing loader | document verification | 800-1200ms loop | 48-72 | linear | constant, 0% influence |
| Document verified success | document accepted | 500-700ms | 30-42 | ease-out | 100 to 0, out 50%, in 40% |
| Document rejected error | invalid or unclear document | 200-260ms | 12-16 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |
| Remove document | uploaded file removed | 180-240ms | 11-14 | ease-in | 0 to 100, out 40%, in 50% |

## Toasts, banners, alerts

| UI motion | Acko use case | Duration | Frames at 60fps | Ease type | Ease value |
|---|---|---:|---:|---|---|
| Toast enter | policy downloaded, copied, saved | 240-300ms | 14-18 | ease-out | 100 to 0, out 50%, in 40% |
| Toast exit | toast disappears | 180-240ms | 11-14 | ease-in | 0 to 100, out 40%, in 50% |
| Success banner reveal | payment success, renewal complete | 300-400ms | 18-24 | ease-out | 100 to 0, out 50%, in 40% |
| Warning banner reveal | policy expiring, document pending | 240-320ms | 14-19 | ease-out | 100 to 0, out 50%, in 40% |
| Error banner reveal | payment failed, upload failed | 240-320ms | 14-19 | ease-out | 100 to 0, out 50%, in 40% |
| Banner dismiss | close banner | 180-240ms | 11-14 | ease-in | 0 to 100, out 40%, in 50% |

## Success, error, empty state

| UI motion | Acko use case | Duration | Frames at 60fps | Ease type | Ease value |
|---|---|---:|---:|---|---|
| Success checkmark | policy issued, claim submitted, payment success | 500-700ms | 30-42 | ease-out | 100 to 0, out 50%, in 40% |
| Important success state | policy purchase complete, claim created | 600-800ms | 36-48 | ease-out | 100 to 0, out 50%, in 40% |
| Error field shake | invalid mobile, otp, vehicle number | 200-260ms | 12-16 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |
| Error message reveal | error text appears | 180-240ms | 11-14 | ease-out | 100 to 0, out 50%, in 40% |
| Warning attention motion | policy expiry, document missing | 240-320ms | 14-19 | ease-out | 100 to 0, out 50%, in 40% |
| Empty-state illustration | no claims, no policies, no documents | 1000-1600ms | 60-96 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |
| Onboarding illustration | explain insurance value, claims, renewals | 1200-2000ms | 72-120 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |

## Loading and linear motion

| UI motion | Acko use case | Duration | Frames at 60fps | Ease type | Ease value |
|---|---|---:|---:|---|---|
| Spinner rotation | short system loading | 800-1200ms loop | 48-72 | linear | constant speed, 0% influence |
| Skeleton shimmer | policy cards, quote results, claims loading | 1000-1400ms loop | 60-84 | linear | constant speed, 0% influence |
| Indeterminate progress bar | searching quotes, verifying details | 1000-1600ms loop | 60-96 | linear | constant speed, 0% influence |
| Real upload progress | document upload | based on upload | real time | linear | data-driven |
| Countdown timer | otp resend timer | based on timer | real time | linear | time-based |
| Drag follow | slider, swipe, bottom sheet drag | finger-controlled | real time | linear while dragging | 1:1 with finger |
| Drag settle | sheet or card settles after drag release | 300-500ms | 18-30 | ease-in-out | 0 to 100 to 0, out 50%, in 40% |
