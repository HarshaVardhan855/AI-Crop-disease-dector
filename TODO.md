# TODO: Implement History Button for Past Detected Diseases

## Tasks
- [x] Modify `app.py` to store detailed history (image path, prediction, confidence, cure) instead of just image paths
- [x] Update `templates/index.html` to display history modal with disease details (image, prediction, confidence, cure)
- [x] Style the history button as a small circular button on the left side in `static/style.css`
- [x] Test the history functionality to ensure it shows the last three detected diseases

## Information Gathered
- Current `app.py` has `image_history` list storing only image paths, keeping last 3 images.
- `templates/index.html` has a history button and modal, but modal only shows images without disease details.
- History button is currently positioned on the right; needs to be moved to left and made circular/small.
- `static/style.css` defines styles for the history button and modal.
- `static/script.js` has modal open/close functions.

## Plan
1. Update `app.py`:
   - Change `image_history` to store dictionaries with keys: 'img_path', 'prediction', 'confidence', 'cure'
   - Modify `/predict` route to append full details to history
   - Ensure history keeps only last 3 entries

2. Update `templates/index.html`:
   - Change history button text to "H" for simplicity
   - Modify history modal to display each history item with image, prediction, confidence, and cure suggestion

3. Update `static/style.css`:
   - Reposition `.history-btn` to left side
   - Make it circular and small (e.g., 40px diameter)

4. No changes needed to `static/script.js` as modal functions are already present.

## Dependent Files
- `app.py`: Core logic for storing and passing history data
- `templates/index.html`: Template for displaying history button and modal content
- `static/style.css`: Styling for the history button

## Followup Steps
- Run the Flask app and test uploading images to verify history stores and displays correctly
- Ensure modal closes properly and history shows up to 3 past detections
