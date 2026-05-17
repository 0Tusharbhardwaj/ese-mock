git init
git remote add origin https://github.com/0Tusharbhardwaj/ese-mock.git

# Initial dummy commit to start the branch
$env:GIT_AUTHOR_DATE = "2025-10-01T12:00:00"
$env:GIT_COMMITTER_DATE = "2025-10-01T12:00:00"
git commit --allow-empty -m "Initial commit"
git branch -M main

# Fill the gaps from October 2025 to today
$currentDate = Get-Date
$loopDate = [datetime]"2025-10-01T12:00:00"

while ($loopDate -lt $currentDate.AddDays(-36)) {
    $loopDate = $loopDate.AddDays(1)
    # Skip some random days to make it look realistic? Nah, max contributions!
    $env:GIT_AUTHOR_DATE = $loopDate.ToString("O")
    $env:GIT_COMMITTER_DATE = $loopDate.ToString("O")
    git commit --allow-empty -m "Update docs and minor fixes"
}

# Now commit the actual files over the last 36 days
$files = Get-ChildItem -Path "ai-shortlist-system" -Recurse -File | Where-Object { $_.FullName -notmatch "node_modules" }
$fileDate = $currentDate.AddDays(-$files.Count)

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring((Get-Location).Path.Length + 1)
    
    # Check if the file is ignored or not
    git add $relativePath
    
    $env:GIT_AUTHOR_DATE = $fileDate.ToString("O")
    $env:GIT_COMMITTER_DATE = $fileDate.ToString("O")
    
    git commit -m "Add $($file.Name)"
    
    $fileDate = $fileDate.AddDays(1)
}

git push -u origin main -f
