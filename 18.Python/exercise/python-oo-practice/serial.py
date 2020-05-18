"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self, start):
        self.start = start
        self.next_val = start

    def generate(self):
        """Generate next value in the sequence; starting at start value"""
        ret_val = self.next_val
        self.next_val = self.next_val + 1
        return ret_val

    def reset(self):
        """Reset the value back to the start value"""
        self.next_val = self.start
