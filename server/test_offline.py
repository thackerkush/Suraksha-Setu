import sys
import os
from pathlib import Path

# Add project root to path
sys.path.append(str(Path(__file__).parent.parent))

from server.services.llm_service import analyze_message, TEST_SCAMS

def run_tests():
    print("=== Running Suraksha Setu Offline Engine Tests ===")
    print(f"Total Test Cases Loaded: {len(TEST_SCAMS)}")
    assert len(TEST_SCAMS) == 15, f"Expected 15 test cases, got {len(TEST_SCAMS)}"
    
    # Test 1: Fake UPI Collect Request
    upi_scam = TEST_SCAMS[0]
    print(f"\nTesting Case 1: {upi_scam['title']}...")
    result = analyze_message(upi_scam["text"])
    
    assert result["verdict"] == "Scam", f"Expected 'Scam', got {result['verdict']}"
    assert result["confidence"] == 98, f"Expected 98, got {result['confidence']}"
    assert "en" in result["explanation"] and "hi" in result["explanation"] and "gu" in result["explanation"], "Missing multilingual explanation"
    assert len(result["action_steps"]["hi"]) > 0, "Missing Hindi action steps"
    assert result["is_fallback"] == True, "Expected is_fallback to be True"
    print("✅ Case 1 Passed! Multilingual explanations and action steps verified.")
    
    # Test 2: Legitimate Bank SMS
    legit_msg = TEST_SCAMS[2]
    print(f"\nTesting Case 3: {legit_msg['title']}...")
    result_legit = analyze_message(legit_msg["text"])
    
    assert result_legit["verdict"] == "Likely Legitimate", f"Expected 'Likely Legitimate', got {result_legit['verdict']}"
    assert result_legit["is_fallback"] == True, "Expected is_fallback to be True"
    print("✅ Case 3 Passed! Legitimate banking alert verified.")
    
    print("\n🎉 ALL OFFLINE ENGINE TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    run_tests()
