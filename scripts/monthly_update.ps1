param(
  [string]$OutputPath = ""
)

$root = Split-Path -Parent $PSScriptRoot
if ([string]::IsNullOrWhiteSpace($OutputPath)) {
  $OutputPath = Join-Path $root "data_update_log.json"
}

$sources = @(
  @{ name = "BLS Employment Cost Index (ECI)"; url = "https://www.bls.gov/eci/" },
  @{ name = "BLS CPI (Shelter components)"; url = "https://www.bls.gov/cpi/" },
  @{ name = "BEA Personal Consumption Expenditures (PCE)"; url = "https://www.bea.gov/data/consumer-spending/main" },
  @{ name = "FHFA House Price Index"; url = "https://www.fhfa.gov/data/hpi/" },
  @{ name = "Case-Shiller Home Price Index"; url = "https://www.spglobal.com/spdji/en/indices/indicators/sp-corelogic-case-shiller-us-national-home-price-nsa-index/" },
  @{ name = "NAR Housing Affordability Index"; url = "https://www.nar.realtor/research-and-statistics/housing-statistics/housing-affordability-index" },
  @{ name = "Federal Reserve Survey of Consumer Finances (SCF)"; url = "https://www.federalreserve.gov/econres/scfindex.htm" },
  @{ name = "MIT Living Wage Calculator"; url = "https://livingwage.mit.edu/" },
  @{ name = "Child Care Aware of America"; url = "https://www.childcareaware.org/" },
  @{ name = "KFF Employer Health Benefits Survey"; url = "https://www.kff.org/health-costs/report/2024-employer-health-benefits-survey/" },
  @{ name = "FRED"; url = "https://fred.stlouisfed.org/" },
  @{ name = "ADP Pay Insights"; url = "https://payinsights.adp.com/" },
  @{ name = "Paychex Employment Watch"; url = "https://www.paychex.com/employment-watch/#!/news-release/" },
  @{ name = "U.S. Census Bureau (Income Tables)"; url = "https://www.census.gov/data/tables/time-series/demo/income-poverty/historical-income-households.html" },
  @{ name = "BLS Weekly Earnings"; url = "https://www.bls.gov/news.release/wkyeng.nr0.htm" }
)

$results = foreach ($source in $sources) {
  $entry = [ordered]@{
    name = $source.name
    url = $source.url
    status = "unknown"
    lastModified = ""
    etag = ""
    error = ""
  }

  try {
    $response = Invoke-WebRequest -Uri $source.url -Method Head -UseBasicParsing -TimeoutSec 30
    $entry.status = $response.StatusCode
    if ($response.Headers["Last-Modified"]) { $entry.lastModified = $response.Headers["Last-Modified"] }
    if ($response.Headers["ETag"]) { $entry.etag = $response.Headers["ETag"] }
  } catch {
    $entry.status = "error"
    $entry.error = $_.Exception.Message
  }

  [pscustomobject]$entry
}

$log = [pscustomobject]@{
  runAt = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssK")
  results = $results
}

$json = $log | ConvertTo-Json -Depth 4
Set-Content -Path $OutputPath -Value $json -Encoding UTF8
Write-Host "Monthly update log written to $OutputPath"
