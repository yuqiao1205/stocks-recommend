from pathlib import Path

def read_symbols(name):
    return (Path(__file__).parent / f'{name}.txt').read_text().splitlines()

def write_symbols(name, symbols):
    (Path(__file__).parent / f'{name}.txt').write_text('\n'.join(symbols))

if __name__ == '__main__':
    print(read_symbols('my_stocks'))
