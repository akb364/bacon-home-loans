import { useState } from "react";
import Disclaimer from "../components/Disclaimer";
import Headshot from "../components/Headshot";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { Section, SectionHeader } from "../components/Section";
import siteConfig from "../lib/siteConfig";

const initialValues = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  purchaseTimeline: "",
  estimatedCreditScore: "",
  loanGoal: "",
  message: "",
  website: ""
};

const leadEndpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "";

const timelineOptions = [
  "Now to 30 days",
  "1 to 3 months",
  "3 to 6 months",
  "6+ months",
  "Just researching"
];

const creditScoreOptions = [
  "760+",
  "720-759",
  "680-719",
  "640-679",
  "600-639",
  "Below 600",
  "Not sure"
];

const loanGoalOptions = [
  "Buy my first home",
  "Use an FHA loan",
  "Use a conventional loan",
  "Use a VA loan",
  "Find down payment assistance",
  "Compare loan options",
  "Refinance or other question"
];

function validate(values) {
  const nextErrors = {};
  const phoneDigits = values.phone.replace(/\D/g, "");

  if (!values.fullName.trim()) {
    nextErrors.fullName = "Enter your full name.";
  }

  if (!values.phone.trim()) {
    nextErrors.phone = "Enter your phone number.";
  } else if (phoneDigits.length < 10) {
    nextErrors.phone = "Enter a 10-digit phone number.";
  }

  if (!values.email.trim()) {
    nextErrors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    nextErrors.email = "Enter a valid email address.";
  }

  if (!values.city.trim()) {
    nextErrors.city = "Enter your city.";
  }

  if (!values.purchaseTimeline) {
    nextErrors.purchaseTimeline = "Select a purchase timeline.";
  }

  if (!values.estimatedCreditScore) {
    nextErrors.estimatedCreditScore = "Select an estimated credit score range.";
  }

  if (!values.loanGoal) {
    nextErrors.loanGoal = "Select your loan goal.";
  }

  if (!values.message.trim()) {
    nextErrors.message = "Add a short message.";
  } else if (values.message.trim().length < 10) {
    nextErrors.message = "Add a little more detail.";
  }

  return nextErrors;
}

function ErrorMessage({ id, message }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="mt-2 text-sm font-semibold text-red-600">
      {message}
    </p>
  );
}

export default function Contact() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setStatus("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    if (!leadEndpoint) {
      setStatus(
        "Thanks. This form is ready to send leads once the Google Sheets endpoint is configured."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      await fetch(leadEndpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify({
          ...values,
          source: "Bacon Home Loans website",
          submittedAt: new Date().toISOString()
        })
      });

      setValues(initialValues);
      setStatus(
        "Thanks. Your message has been sent, and Austin will review your information soon."
      );
    } catch (error) {
      setStatus(
        "Something went wrong sending the form. Please call or email Austin directly, or try again in a moment."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout>
      <Seo
        title="Contact Austin Bacon, Arizona Mortgage Loan Officer"
        description="Contact Austin Bacon, NMLS ID 2728600, for Arizona mortgage guidance, FHA loans, first-time buyer programs, and down payment assistance."
        path="/contact"
      />
      <section className="bg-white">
        <Section className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Contact"
              title="See what you may qualify for."
              description={`Share the basics with ${siteConfig.officerName}, NMLS ID: ${siteConfig.nmlsId}, so the next conversation can focus on loan options, payment comfort, and Arizona program fit. This demo form is not connected to a backend yet.`}
            />
            <div className="mt-8 flex items-center gap-4 rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <Headshot className="h-24 w-24 shrink-0" />
              <div>
                <p className="text-lg font-black text-ink">{siteConfig.officerName}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Arizona mortgage loan officer
                  <br />
                  NMLS ID: {siteConfig.nmlsId}
                </p>
              </div>
            </div>
            <div className="mt-8 rounded-md border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                Direct
              </p>
              <div className="mt-3 text-lg font-black text-ink">
                <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>
              </div>
              <div className="mt-1 text-sm text-slate-600">
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </div>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Powered by {siteConfig.brokerageName}
              </p>
            </div>
            <div className="mt-5 rounded-md border border-saguaro-500/20 bg-saguaro-500/10 p-5">
              <p className="text-sm font-black text-saguaro-700">What happens next</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                A loan officer can review your goals, discuss documentation, and explain potential
                next steps. No approval decision is made from this form.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-md border border-slate-200 bg-white p-6 shadow-soft"
          >
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                tabIndex="-1"
                autoComplete="off"
                value={values.website}
                onChange={updateField}
              />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="label" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  className="field mt-2"
                  id="fullName"
                  name="fullName"
                  value={values.fullName}
                  onChange={updateField}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                />
                <ErrorMessage id="fullName-error" message={errors.fullName} />
              </div>
              <div>
                <label className="label" htmlFor="phone">
                  Phone
                </label>
                <input
                  className="field mt-2"
                  id="phone"
                  name="phone"
                  type="tel"
                  value={values.phone}
                  onChange={updateField}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder={siteConfig.phoneDisplay}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                <ErrorMessage id="phone-error" message={errors.phone} />
              </div>
              <div>
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  className="field mt-2"
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={updateField}
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                <ErrorMessage id="email-error" message={errors.email} />
              </div>
              <div>
                <label className="label" htmlFor="city">
                  City
                </label>
                <input
                  className="field mt-2"
                  id="city"
                  name="city"
                  value={values.city}
                  onChange={updateField}
                  autoComplete="address-level2"
                  placeholder="Phoenix"
                  aria-invalid={Boolean(errors.city)}
                  aria-describedby={errors.city ? "city-error" : undefined}
                />
                <ErrorMessage id="city-error" message={errors.city} />
              </div>
              <div>
                <label className="label" htmlFor="purchaseTimeline">
                  Purchase Timeline
                </label>
                <select
                  className="field mt-2"
                  id="purchaseTimeline"
                  name="purchaseTimeline"
                  value={values.purchaseTimeline}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.purchaseTimeline)}
                  aria-describedby={errors.purchaseTimeline ? "purchaseTimeline-error" : undefined}
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  {timelineOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <ErrorMessage id="purchaseTimeline-error" message={errors.purchaseTimeline} />
              </div>
              <div>
                <label className="label" htmlFor="estimatedCreditScore">
                  Estimated Credit Score
                </label>
                <select
                  className="field mt-2"
                  id="estimatedCreditScore"
                  name="estimatedCreditScore"
                  value={values.estimatedCreditScore}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.estimatedCreditScore)}
                  aria-describedby={
                    errors.estimatedCreditScore ? "estimatedCreditScore-error" : undefined
                  }
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  {creditScoreOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <ErrorMessage
                  id="estimatedCreditScore-error"
                  message={errors.estimatedCreditScore}
                />
              </div>
              <div className="md:col-span-2">
                <label className="label" htmlFor="loanGoal">
                  Loan Goal
                </label>
                <select
                  className="field mt-2"
                  id="loanGoal"
                  name="loanGoal"
                  value={values.loanGoal}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.loanGoal)}
                  aria-describedby={errors.loanGoal ? "loanGoal-error" : undefined}
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  {loanGoalOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <ErrorMessage id="loanGoal-error" message={errors.loanGoal} />
              </div>
              <div className="md:col-span-2">
                <label className="label" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="field mt-2 min-h-[150px]"
                  id="message"
                  name="message"
                  value={values.message}
                  onChange={updateField}
                  placeholder="Share the city, price range, or questions you want help with."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                <ErrorMessage id="message-error" message={errors.message} />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 rounded-md bg-saguaro-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-saguaro-500 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isSubmitting ? "Sending..." : "See What You Qualify For"}
            </button>
            {status && (
              <div className="mt-5 rounded-md border border-saguaro-500/30 bg-saguaro-500/10 p-4 text-sm font-semibold leading-6 text-saguaro-700">
                {status}
              </div>
            )}
            <Disclaimer className="mt-6" />
          </form>
        </Section>
      </section>
    </Layout>
  );
}
